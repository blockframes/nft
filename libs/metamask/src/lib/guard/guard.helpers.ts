import { MatDialog } from '@angular/material/dialog';
import { MetamaskService } from '../+state/metamask.service';
import { ChooseNetworkComponent } from '../component/choose-network/choose-network.component';

export async function networkCheck(dialog: MatDialog, service: MetamaskService) {
  const isOnWantedNetwork = await service.isOnWantedNetwork();
  if (!isOnWantedNetwork) {
    dialog.open(ChooseNetworkComponent, {
      width: '600px',
      height: '250px',
      disableClose: true
    });
  }
}
