/*
 * Copyright (C) 2016 Stratio (http://stratio.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StTreeComponent } from './st-tree.component';
import { StNodeTreeComponent } from './st-node-tree/st-node-tree.component';
import { StTreeNodeExpandComponent } from './st-tree-node-expand/st-tree-node-expand.component';

import { EgeoResolveService } from '../utils/egeo-resolver/egeo-resolve.service';

@NgModule({
   imports: [CommonModule],
   declarations: [StTreeComponent, StNodeTreeComponent, StTreeNodeExpandComponent],
   exports: [StTreeComponent],
   providers: [EgeoResolveService]
})
export class StTreeModule { }
