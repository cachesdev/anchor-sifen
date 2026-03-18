import { Agent } from 'node:https';
import { SifenRucClient } from './consulta-ruc';
import { SifenRecibeLoteClient } from './recibe-lote';

export type SifenEnvironment = 'test' | 'prod';

export interface SifenClientOptions {
  environment: SifenEnvironment;
  certificatePem: string;
  certificatePemKey: string;
}

export class SifenSoapClient {
  rucClient: SifenRucClient;
  recibeLoteClient: SifenRecibeLoteClient;
  agent: Agent;

  constructor(options: SifenClientOptions) {
    this.agent = this.createHttpsAgent({
      pem: options.certificatePem,
      pemKey: options.certificatePemKey
    });
    this.rucClient = new SifenRucClient({ ...options, agent: this.agent });
    this.recibeLoteClient = new SifenRecibeLoteClient({ ...options, agent: this.agent });
  }

  private createHttpsAgent({ pem, pemKey }: { pem: string; pemKey: string }): Agent {
    return new Agent({
      cert: pem,
      key: pemKey,
      minVersion: 'TLSv1.2'
    });
  }
}
