import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScrollAnimateDirective } from '@/shared/scroll-animate.directive';
import { SectionTitleComponent } from '@/components/ui/section-title/section-title.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScrollAnimateDirective, SectionTitleComponent],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  sent = false;
  form;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, message } = this.form.value;
    const text = `Hello Digital Bond!
Name: ${name}
Email: ${email}
Message: ${message}`;

    const encoded = encodeURIComponent(text);
    const phone = '201552055980';
    const url = `https://wa.me/${phone}?text=${encoded}`;

    this.sent = true;
    setTimeout(() => {
      window.open(url, '_blank');
    }, 600);
  }
}
