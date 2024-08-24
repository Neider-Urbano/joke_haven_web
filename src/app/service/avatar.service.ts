import { Injectable, signal } from '@angular/core';
import { createAvatar, Result } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  avatar = signal<Result | string>('');

  generateAvatar(): void {
    const avatarResult = createAvatar(adventurer);
    this.avatar.set(avatarResult);
  }
}
