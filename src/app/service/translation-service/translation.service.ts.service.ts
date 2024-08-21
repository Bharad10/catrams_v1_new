import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationServiceTsService {
  private readonly translateApiUrl = 'https://translation.googleapis.com/language/translate/v2';
  private readonly apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual API key

  constructor(private http: HttpClient) {}

  translateToArabic(text: string): Promise<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('target', 'ar')
      .set('q', text);

    return this.http.post<any>(this.translateApiUrl, {}, { headers, params })
      .toPromise()
      .then(response => response.data.translations[0].translatedText)
      .catch(error => {
        console.error('Translation error:', error);
        return text; // Return original text on error
      });
  }

  extractAndTranslateTextFromHTML(html: string): Promise<string[]> {
    const textContent = this.extractTextContentFromHTML(html);
    const translatedTexts: Promise<string>[] = textContent.map(text => this.translateToArabic(text));
    return Promise.all(translatedTexts);
  }

  private extractTextContentFromHTML(html: string): string[] {
    const container = document.createElement('div');
    container.innerHTML = html;
    const elements = container.querySelectorAll('*');
    const textContent: string[] = [];
    elements.forEach(element => {
      const text = element.textContent?.trim(); // Use optional chaining to safely access textContent
      if (text && text !== '') {
        textContent.push(text);
      }
    });
    return textContent;
  }
  
}
