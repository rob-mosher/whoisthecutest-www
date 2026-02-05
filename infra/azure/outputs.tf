output "app_insights_connection_string" {
  description = "Connection string for the Application Insights resource."
  value       = azurerm_application_insights.main.connection_string
  sensitive   = true
}

output "app_insights_instrumentation_key" {
  description = "Instrumentation key for the Application Insights resource."
  value       = azurerm_application_insights.main.instrumentation_key
  sensitive   = true
}

output "app_insights_app_id" {
  description = "Application Insights App ID."
  value       = azurerm_application_insights.main.app_id
}

output "log_analytics_workspace_id" {
  description = "Log Analytics workspace resource ID."
  value       = azurerm_log_analytics_workspace.main.id
}
