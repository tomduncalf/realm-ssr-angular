import { Component } from '@angular/core';
import * as Realm from 'realm-web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'realm-ssr-angular';

  async ngOnInit() {
    const app = new Realm.App({ id: 'app id here' });
    const user = await app.logIn(Realm.Credentials.anonymous());
    const mongodb = app.currentUser?.mongoClient('mongodb-atlas');
    const tasksCollection = mongodb?.db('template').collection('Task');

    const tasks = (await tasksCollection!.find()).map((t) => ({
      description: t.description,
      isComplete: t.isComplete,
    }));

    console.log({ tasks });
  }
}
