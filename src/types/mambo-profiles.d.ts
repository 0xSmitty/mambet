declare module 'mambo-profiles/dist/src/index.js' {
  export class MAMBOPROFILE {
    constructor(client: any);
    getProfile(address: string): Promise<any>;
    getManyProfiles(addresses: string[]): Promise<any[]>;
  }
}
