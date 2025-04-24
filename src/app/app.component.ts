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

  READ_tarefas() {
    this.service.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe(
      resultado => {
        this.arrayDeTarefas = resultado;
        console.log('Tarefas carregadas', this.arrayDeTarefas);
      },
      erro => {
        console.error('Erro ao carregar tarefas', erro);
      }
    );
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    const novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.service.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe(
      resultado => {
        console.log('Tarefa criada', resultado);
        this.READ_tarefas(); // Recarrega as tarefas após a criação
      },
      erro => {
        console.error('Erro ao criar tarefa', erro);
      }
    );
  }

  DELETE_tarefa(tarefaASerRemovida: Tarefa) {
    const indice = this.arrayDeTarefas.indexOf(tarefaASerRemovida);
    const id = this.arrayDeTarefas[indice]._id;
    this.service.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe(
      resultado => {
        console.log('Tarefa deletada', resultado);
        this.READ_tarefas(); // Recarrega as tarefas após a exclusão
      },
      erro => {
        console.error('Erro ao deletar tarefa', erro);
      }
    );
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    const indice = this.arrayDeTarefas.indexOf(tarefaAserModificada);
    const id = this.arrayDeTarefas[indice]._id;
    this.service.patch<Tarefa>(`${this.apiURL}/api/update/${id}`, tarefaAserModificada).subscribe(
      resultado => {
        console.log('Tarefa atualizada', resultado);
        this.READ_tarefas(); // Recarrega as tarefas após a atualização
      },
      erro => {
        console.error('Erro ao atualizar tarefa', erro);
      }
    );
  }
}
