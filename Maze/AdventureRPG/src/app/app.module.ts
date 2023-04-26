import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MazeComponent } from './maze/maze.component';
import { GameService } from './services/game.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MazeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    GameService // 在此添加 GameService 的提供程序
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
