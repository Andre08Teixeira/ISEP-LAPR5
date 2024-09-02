import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
    // quando criar um butao em outro espaço qualquer ele vai ter esses parametros
    // texto, cor e a funçao que eu quiser
    
  @Input() text: string;
  @Input() color: string;  
  @Output() btnClick = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
      this.btnClick.emit();
  };

}
