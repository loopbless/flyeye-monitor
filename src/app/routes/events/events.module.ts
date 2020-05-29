import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { EventsRoutingModule } from './events-routing.module';
import { EventsListComponent } from './list/list.component';
import { EventsProfileComponent } from './profile/profile.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';

@NgModule({
  declarations: [EventsListComponent, EventsProfileComponent],
  imports: [
    SharedModule,
    CodemirrorModule,
    EventsRoutingModule,
  ]
})
export class EventsModule {
}
