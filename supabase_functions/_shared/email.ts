import { OAuth2ClientConfig } from "https://deno.land/x/oauth2_client@v1.0.0/mod.ts";
import { EMAIL_SERVICES } from "../_emailServices/services.ts";

export type Integeration = {
  id?: string;
  integeration: string;
  userId: string;
  title: string;
};

export type Subscription = {
  email: string;
  name: string;
  tags: {
    add: string[];
    remove: string[];
  };
};

export class EmailService {
  private static services: EmailService[] = [];
  oauthObject: OAuth2ClientConfig;
  name: string;
  subscribe: (subscription: Subscription) => Promise<boolean>;

  constructor(service: EmailService) {
    this.oauthObject = service.oauthObject;
    this.name = service.name;
    this.subscribe = service.subscribe;
  }

  public static RegisterServices(services: EmailService[]) {
    EmailService.services = services;
  }

  public static getService(serviceName: string): EmailService {
    return EmailService.services.find(
      (service) => service.name == serviceName
    )!;
  }
}

// Register All Email services
EmailService.RegisterServices(EMAIL_SERVICES);

