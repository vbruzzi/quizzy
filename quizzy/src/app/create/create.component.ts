import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  quizForm: FormGroup;
  questions: Array<Object> = [];
  model: Object = {'question': 'Question', 'options':["", "", "", ""]};
  test = "";

  addNew(){
    this.questions.push(this.model);
    console.log(this.questions)
  }

  getQuestions(){
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion() {
    const question = this.fb.group({
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    });
    this.questions
  }

  ngOnInit() {
    this.quizForm = this.fb.group({
      name: '',
      questions: this.fb.array([])
    });
  }

}
