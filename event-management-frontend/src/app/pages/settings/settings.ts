import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user';
import { AuthService } from '../../services/auth/auth.sevice';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
  user: User = {
    name: '',
    email: '',
    phone: '',
    bio: '',
    avatarUrl: '',
    instagramAccount: '',
    xAccount: '',
    youtubeAccount: '',
    linkedinAccount: '',
    website: '',
    emailSup: []
  };

  username: string = '';
  newEmail: string = '';
  isLoading: boolean = false;
  saveSuccess: boolean = false;
  saveError: string = '';
  showAddEmailModal: boolean = false;
  newEmailAddress: string = '';
  showDeleteModal: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    try {
      let user = this.authService.getCurrentUser();
      if (!user) {
        user = await this.authService.loadUser();
      }
      if (user) {
        this.user = user;
        this.username = this.user.name;
      }
    } catch (err) {
      console.error('Failed to load user profile', err);
    } finally {
      this.isLoading = false;
    }
  }

  saveProfileChanges(): void {
    this.isLoading = true;
    this.saveError = '';
    this.saveSuccess = false;
    
    const updatedUser: User = {
      ...this.user,
      name: this.user.name,
      phone: this.user.phone,
      bio: this.user.bio,
      instagramAccount: this.user.instagramAccount,
      xAccount: this.user.xAccount,
      youtubeAccount: this.user.youtubeAccount,
      linkedinAccount: this.user.linkedinAccount,
      website: this.user.website,
      emailSup: this.user.emailSup
    };

    this.userService.updateProfile(updatedUser).subscribe({
      next: (user) => {
        this.user = user;
        // update cached user so other pages reflect changes immediately
        try { this.authService.setCachedUser(user); } catch (e) { console.warn('Failed to update auth cache', e); }
        this.saveSuccess = true;
        this.isLoading = false;
        setTimeout(() => this.saveSuccess = false, 3000);
      },
      error: (err) => {
        console.error('Failed to save profile', err);
        this.saveError = 'Failed to save changes. Please try again.';
        this.isLoading = false;
      }
    });
  }

  closeSuccess(): void {
    this.saveSuccess = false;
  }

  addEmail(): void {
    this.newEmailAddress = '';
    this.showAddEmailModal = true;
  }

  confirmAddEmail(): void {
    const email = this.newEmailAddress.trim();
    if (!email) {
      return;
    }
    this.isLoading = true;
    this.saveError = '';

    this.userService.addEmail(email).subscribe({
      next: (user) => {
        this.user = user;
        this.showAddEmailModal = false;
        this.newEmailAddress = '';
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to add email', err);
        this.saveError = 'Failed to add email. Please try again.';
        this.isLoading = false;
      }
    });
  }

  closeAddEmailModal(): void {
    this.showAddEmailModal = false;
    this.newEmailAddress = '';
  }

  removeEmail(index: number): void {
    if (!this.user.emailSup || index < 0 || index >= this.user.emailSup.length) {
      return;
    }

    this.isLoading = true;
    this.saveError = '';

    this.userService.removeEmail(index).subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to remove email', err);
        this.saveError = 'Failed to remove email. Please try again.';
        this.isLoading = false;
      }
    });
  }

  updatePhone(): void {
    this.saveProfileChanges();
  }

  deleteAccount(): void {
    this.showDeleteModal = true;
  }

  confirmDeleteAccount(): void {
    this.isLoading = true;
    this.saveError = '';

    this.userService.deleteAccount().subscribe({
      next: () => {
        console.log('Account deleted successfully');
        this.isLoading = false;
        this.showDeleteModal = false;
        this.authService.logout();
      },
      error: (err) => {
        console.error('Failed to delete account', err);
        this.saveError = 'Failed to delete account. Please try again.';
        this.isLoading = false;
        this.showDeleteModal = false;
      }
    });
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  handleAvatarUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.isLoading = true;
      this.userService.uploadAvatar(file).subscribe({
        next: (response) => {
          console.log('Avatar uploaded successfully', response);
          // Update user avatar URL
          if (response.avatarUrl) {
            this.user.avatarUrl = response.avatarUrl;
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to upload avatar', err);
          this.saveError = 'Failed to upload avatar. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }
}
