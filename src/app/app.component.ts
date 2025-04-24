import { Component, OnInit } from '@angular/core';
import { Tarefa } from './tarefa';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TODOapp';
  apiURL: string = 'https://back-end-todo-app-8.onrender.com';
  arrayDeTarefas: Tarefa[] = [];

  constructor(private service: HttpClient) {}

  ngOnInit(): void {
    this.READ_tarefas();
  }

  READ_tarefas(): void {
    this.service.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe({
      next: (resultado) => {
        this.arrayDeTarefas = resultado;
        console.log('Tarefas carregadas', this.arrayDeTarefas);
      },
      error: (erro) => {
        console.error('Erro ao carregar tarefas', erro);
      }
    });
  }

  CREATE_tarefa(descricaoNovaTarefa: string): void {
    const novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.service.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe({
      next: (resultado) => {
        console.log('Tarefa criada', resultado);
        this.READ_tarefas();
      },
      error: (erro) => {
        console.error('Erro ao criar tarefa', erro);
      }
    });
  }

  DELETE_tarefa(tarefaASerRemovida: Tarefa): void {
    if (!tarefaASerRemovida._id) {
      console.error('ID da tarefa não encontrado.');
      return;
    }

    this.service.delete(`${this.apiURL}/api/delete/${tarefaASerRemovida._id}`).subscribe({
      next: (resultado) => {
        console.log('Tarefa deletada', resultado);
        this.READ_tarefas();
      },
      error: (erro) => {
        console.error('Erro ao deletar tarefa', erro);
      }
    });
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa): void {
    if (!tarefaAserModificada._id) {
      console.error('ID da tarefa não encontrado.');
      return;
    }

    this.service.patch(`${this.apiURL}/api/update/${tarefaAserModificada._id}`, tarefaAserModificada).subscribe({
      next: (resultado) => {
        console.log('Tarefa atualizada', resultado);
        this.READ_tarefas();
      },
      error: (erro) => {
        console.error('Erro ao atualizar tarefa', erro);
      }
    });
  }
}
