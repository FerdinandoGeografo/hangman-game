import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { routeTransition } from './shared/animations/route-transition';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main [@routeTransition]="route.snapshot.data">
      <router-outlet />
    </main>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeTransition],
})
export class AppComponent {
  protected route = inject(ActivatedRoute);
}
