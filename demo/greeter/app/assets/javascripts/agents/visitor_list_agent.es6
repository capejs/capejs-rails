class VisitorListAgent extends Cape.CollectionAgent {
  constructor(client, options) {
    super(client, options);
    this.resourceName = 'visitors';
    this.basePath = '/api/';
  }
}
