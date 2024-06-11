import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  templateUrl: "auth.component.html",
})
export class AuthComponent {
  username?: string;
  password?: string;
  errorMessage?: string;

  constructor(private router: Router) { }

  authenticate(form: NgForm) {
    if (form.valid) {
      //perform authentication
      this.router.navigateByUrl("/admin/main");
    } else {
      this.errorMessage = "Form Data Invalid";
    }
  }
}
