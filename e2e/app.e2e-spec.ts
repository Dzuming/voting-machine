import { VotingMachineClientPage } from './app.po';

describe('voting-machine-client App', function() {
  let page: VotingMachineClientPage;

  beforeEach(() => {
    page = new VotingMachineClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
