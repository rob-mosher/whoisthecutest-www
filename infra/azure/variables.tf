variable "location" {
  description = "Azure region for all resources."
  type        = string
  validation {
    condition     = length(trim(var.location)) > 0
    error_message = "location must be a non-empty string."
  }
}

variable "resource_group_name" {
  description = "Resource group to create/use for App Insights resources."
  type        = string
  validation {
    condition     = length(trim(var.resource_group_name)) > 0
    error_message = "resource_group_name must be a non-empty string."
  }
}

variable "create_resource_group" {
  description = "Whether Terraform should create the resource group (set false if it already exists)."
  type        = bool
}

variable "log_analytics_workspace_name" {
  description = "Log Analytics workspace name (workspace-based App Insights requires this)."
  type        = string
  validation {
    condition     = length(trim(var.log_analytics_workspace_name)) > 0
    error_message = "log_analytics_workspace_name must be a non-empty string."
  }
}

variable "log_analytics_workspace_sku" {
  description = "Log Analytics workspace SKU."
  type        = string
  validation {
    condition     = length(trim(var.log_analytics_workspace_sku)) > 0
    error_message = "log_analytics_workspace_sku must be a non-empty string."
  }
}

variable "log_analytics_retention_in_days" {
  description = "Retention in days for Log Analytics workspace."
  type        = number
  validation {
    condition     = var.log_analytics_retention_in_days >= 30 && var.log_analytics_retention_in_days <= 730
    error_message = "log_analytics_retention_in_days must be between 30 and 730 days."
  }
}

variable "application_insights_name" {
  description = "Application Insights resource name."
  type        = string
  validation {
    condition     = length(trim(var.application_insights_name)) > 0
    error_message = "application_insights_name must be a non-empty string."
  }
}

variable "tags" {
  description = "Tags applied to all resources."
  type        = map(string)
}
