import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { AvatarService } from 'src/app/service/avatar.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent {
  constructor(
    private avatarService: AvatarService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const avatar = this.avatarService;
    avatar.generateAvatar();

    this.renderer.setProperty(
      this.el.nativeElement.querySelector('.avatar-svg'),
      'innerHTML',
      avatar.avatar()
    );
  }
}
