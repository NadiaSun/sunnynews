import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NewsInterceptor } from './shared/news.interceptor';
import { SearchPipe } from './shared/search.pipe';
import { NewsItemComponent } from './news-item/news-item.component';
import { SearchComponent } from './search/search.component';
import { CategoriesComponent } from './categories/categories.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: NewsInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    NewsItemComponent,
    SearchComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
