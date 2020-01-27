import { ParamMap } from '@angular/router';

export interface SearchQuery extends ParamMap {
  keywords?: string;
  latitude?: string;
  longitude?: string;
}