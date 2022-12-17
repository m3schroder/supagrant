import { OAuth2ClientConfig } from "https://deno.land/x/oauth2_client@v1.0.0/mod.ts";
import { INTEGRATION_LIST } from "../_services/_integration_list.ts";

// Database Objection that represents an integration
export type Integration = {
  id?: string;
  integration: string;
  userId: string;
  title: string;
  access_token: string;
  refresh_token: string;
};

// Configuration of an integuration
export class IntegrationConfig {
  private static services: IntegrationConfig[] = [];
  name: string;
  oauthObject: OAuth2ClientConfig;

  constructor(service: IntegrationConfig) {
    this.oauthObject = service.oauthObject;
    this.name = service.name;
  }

  public static RegisterServices(services: IntegrationConfig[]) {
    IntegrationConfig.services = services;
  }

  public static getService(serviceName: string): IntegrationConfig {
    return IntegrationConfig.services.find(
      (service: IntegrationConfig) => service.name == serviceName
    )!;
  }
}

// Register All services
IntegrationConfig.RegisterServices(INTEGRATION_LIST);

