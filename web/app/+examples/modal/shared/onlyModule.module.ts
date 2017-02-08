import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Component2Module } from './component2';
import { Component1 } from './component1/component1';
import { StModal } from 'egeo';


@NgModule({
   imports: [CommonModule, Component2Module],
   declarations: [StModal, Component1],
   exports: []
})
export class TestModule2 { }



