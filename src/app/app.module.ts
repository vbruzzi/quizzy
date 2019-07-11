import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule,
         MatRadioModule,
         MatCardModule,
         MatGridListModule,
         MatListModule,
         MatIconModule,
         MatInputModule,
         MatSelectModule,
         MatFormFieldModule,
         MatDividerModule,
         MatExpansionModule,
         MatProgressBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuizviewComponent } from './quizview/quizview.component';
import { QuizresultsComponent } from './quizresults/quizresults.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'quiz/:id', component: QuizComponent},
  {path: 'create', component: CreateComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    CreateComponent,
    QuizviewComponent,
    QuizresultsComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressBarModule,
    MatRadioModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
