import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { EgeoResolverKeys, TranslateServiceType } from './egeo-resolve-model';

@Injectable()
export class EgeoResolveService {

   getKeys(object: any, key: string): EgeoResolverKeys[] {
      return this.searchInDeep(object, key);
   }

   setKeys(object: any, resolved: EgeoResolverKeys[]): void {
      resolved.forEach((element) => _.set(object, element.path, element.resolved));
   }

   translate(object: any, translateService: TranslateServiceType): Observable<any> {
      let keys: EgeoResolverKeys[] = this.getKeys(object, 'translate'); // Get keys
      let toTranslate: string[] = this.extractTranslationKeys(keys); // Extract keys for translate service
      return translateService.get(toTranslate) // return object translation
         .map((translation) => this.remapObjectWithTranslations(translation, keys, object));
   }

   translateArrayOfKeys(keys: string[], translateService: TranslateServiceType): Observable<string[]> {
      return translateService.get(keys)
         .map((translation) => this.remapArrayWithTranslations(translation, keys));
   }

   private remapArrayWithTranslations(translations: { [key: string]: string }, originalArray: string[]): string[] {
      return originalArray.map((key) => translations[key] ? translations[key] : key);
   }

   private remapObjectWithTranslations(translations: { [key: string]: string }, resolverKeys: EgeoResolverKeys[], object: any): any {
      let newObj = _.cloneDeep(object);
      if (translations || _.keys(translations).length > 0) {
         _.forEach(resolverKeys, (resolvKey, key) => {
            _.set(newObj, resolvKey.path, this.getTranslationFromTranslatedKey(translations, resolvKey));
         });
      }
      return newObj;
   }

   private getTranslationFromTranslatedKey(translations: { [key: string]: string }, resolverKey: EgeoResolverKeys): string {
      let translationElementKey = resolverKey && resolverKey.toResolve && resolverKey.toResolve.key ? resolverKey.toResolve.key : '';
      return translations[translationElementKey] ? translations[translationElementKey] : translationElementKey;
   }

   private extractTranslationKeys(list: EgeoResolverKeys[]): string[] {
      return list.map((element) => <string>_.values(_.omit(element.toResolve, 'translate'))[0]);
   }

   private searchInDeep(object: any, key: string, path: string = ''): EgeoResolverKeys[] {
      if (_.has(object, key)) { // If we found key, return object.
         return [{ path, toResolve: object }];
      }
      let result: EgeoResolverKeys[] = [];

      let i = 0;
      _.forEach(object, (value, objKey) => { // Search in deep by all elements
         if (typeof value === 'object') {
            result.push.apply(result, this.searchInDeep(value, key, this.getPath(path, object, i, objKey)));
         }
         i++;
      });
      return result;
   }

   // Build path for future replace
   private getPath(actualPath: string, obj: any, pos: number, key: string): string {
      if (this.isArray(obj)) {
         actualPath = `${actualPath}[${pos}]`;
      } else {
         actualPath = actualPath === '' ? key : `${actualPath}.${key}`;
      }
      return actualPath;
   }

   private isArray(value: any): boolean {
      return Object.prototype.toString.call(value) === '[object Array]';
   }
}
