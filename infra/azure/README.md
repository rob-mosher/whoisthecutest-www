# Azure Application Insights (Terraform)

This Terraform configuration provisions a workspace-based Application Insights resource and the required Log Analytics workspace.

## What it creates
- Resource group
- Log Analytics workspace
- Application Insights (workspace-based)

## Prerequisites
- Azure CLI
- Terraform >= 1.6
- An Azure subscription with permissions to create resources

## Authentication (service principal for CI)
Create a service principal scoped to the resource group (recommended for CI):

```bash
az login
az account set --subscription <SUBSCRIPTION_ID>

az ad sp create-for-rbac \
  --name "whoisthecutest-terraform" \
  --role Contributor \
  --scopes /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/AppInsightsWhoisthecutest
```

Capture the output and export it for Terraform:

```bash
export ARM_SUBSCRIPTION_ID=<SUBSCRIPTION_ID>
export ARM_TENANT_ID=<TENANT_ID>
export ARM_CLIENT_ID=<APP_ID>
export ARM_CLIENT_SECRET=<PASSWORD>
```

These can also be set as GitHub Actions secrets if you later add Terraform to CI.

## Remote state bootstrap (Azure Storage)
Remote state must exist before Terraform can initialize. To keep state in the same resource group, create the group and storage first, then set `create_resource_group=false` in Terraform.

Create the resource group and storage account:

```bash
az group create -n AppInsightsWhoisthecutest -l eastus2

az storage account create \
  -n <STATE_STORAGE_ACCOUNT> \
  -g AppInsightsWhoisthecutest \
  -l eastus2 \
  --sku Standard_LRS \
  --kind StorageV2 \
  --allow-blob-public-access false

az storage container create \
  -n tfstate \
  --account-name <STATE_STORAGE_ACCOUNT>
```

Note: Storage account names must be globally unique, lowercase, and 3-24 characters.
If you want Terraform to manage the resource group, keep `create_resource_group=true` and place the state storage account in a separate bootstrap resource group.

## Terraform init/apply
```bash
cd infra/azure

terraform init \
  -backend-config="resource_group_name=AppInsightsWhoisthecutest" \
  -backend-config="storage_account_name=<STATE_STORAGE_ACCOUNT>" \
  -backend-config="container_name=tfstate" \
  -backend-config="key=appinsights.tfstate"

terraform plan -var "create_resource_group=false"
terraform apply -var "create_resource_group=false"
```

## tfvars
Copy `infra/azure/terraform.tfvars.example` to `infra/azure/terraform.tfvars` and fill in your values. The example is intentionally blank for public repos. The `.tfvars` file is gitignored.

## Outputs
Fetch the connection string for use in the site build:

```bash
terraform output -raw app_insights_connection_string
```

Use this value for the GitHub Actions secret `VITE_APP_INSIGHTS_CONNECTION_STRING`.

## Variables
Defaults are defined in `infra/azure/variables.tf`. Override with `-var` or a `terraform.tfvars` file if needed.
