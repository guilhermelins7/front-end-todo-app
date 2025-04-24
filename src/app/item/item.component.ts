import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tarefa } from '../tarefa';

@Component({
  selector: 'app-item',
  standalone: false,
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  emEdicao = false;
  @Input() tarefa: Tarefa = new Tarefa('', false);
  @Output() removerTarefa = new EventEmitter<Tarefa>();
  @Output() modificaTarefa = new EventEmitter<Tarefa>();

  onRemoverTarefa() {
    this.removerTarefa.emit(this.tarefa);
  }

  alternarStatus() {
    this.tarefa.statusRealizada = !this.tarefa.statusRealizada;
    this.modificaTarefa.emit(this.tarefa);
  }
}

