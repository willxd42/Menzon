import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { StateService } from "src/app/services/state.service";
import { CountriesService } from "src/app/services/countries.service";
import { UsersService } from "src/app/services/users.service";
import { GloberService } from 'src/app/services/glober.service';

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent implements OnInit {
  user: any;
  cRForm: FormGroup;
  states: any[];
  countries: any[];
  loading: boolean;
  education: any[];
  workHistory: any[];
  skills: any[];
  selectedCvFile: any;
  selectedPhotoFile: any;
  documents = [];
  Files = [];
  cv: string;
  photo: string;
  error: boolean;
  error2: boolean;
  check$: boolean;
  cvFile$: any;
  photoFile$: any;
  Finish = "Save";
  u: any;
  public options: Object = {
    charCounterCount: true,
    // Set the image upload parameter.
    imageUploadParam: "image_param",

    // Set the image upload URL.
    imageUploadURL: "assets/upload_image",

    // Additional upload params.
    imageUploadParams: { id: "my_editor" },

    // Set request type.
    imageUploadMethod: "POST",

    // Set max image size to 5MB.
    imageMaxSize: 5 * 1024 * 1024,

    // Allow to upload PNG and JPG.
    imageAllowedTypes: ["jpeg", "jpg", "png", "svg", "gif"],
    events: {
      "froalaEditor.initialized": function() {
        console.log("initialized");
      },
      "froalaEditor.image.beforeUpload": function(e, editor, images) {
        //Your code
        if (images.length) {
          // Create a File Reader.
          const reader = new FileReader();
          // Set the reader to insert images when they are loaded.
          reader.onload = ev => {
            const result = ev.target["result"];
            editor.image.insert(result, null, null, editor.image.get());
            console.log(ev, editor.image, ev.target["result"]);
          };
          // Read image as base64.
          reader.readAsDataURL(images[0]);
        }
        // Stop default upload chain.
        return false;
      }
    },

    // Set the video upload parameter.
    videoUploadParam: "video_param",

    // Set the video upload URL.
    videoUploadURL: "assets/upload_video",

    // Additional upload params.
    videoUploadParams: { id: "my_video_editor" },

    // Set request type.
    videoUploadMethod: "POST",

    // Set max video size to 50MB.
    videoMaxSize: 50 * 1024 * 1024,

    // Allow to upload PNG and JPG.
    videoAllowedTypes: ["mp4", "avi", "flv", "wmv", "mov"],
    viseoEvents: {
      "froalaEditor.initialized": function() {
        console.log("initialized");
      },
      "froalaEditor.video.beforeUpload": function(e, editor, videos) {
        //Your code
        if (videos.length) {
          // Create a File Reader.
          const reader = new FileReader();
          // Set the reader to insert videos when they are loaded.
          reader.onload = ev => {
            const result = ev.target["result"];
            editor.video.insert(result, null, null, editor.video.get());
            console.log(ev, editor.video, ev.target["result"]);
          };
          // Read video as base64.
          reader.readAsDataURL(videos[0]);
        }
        // Stop default upload chain.
        return false;
      }
    }
  };

  birthday: string;
  dateNyscStarted: string;
  dateNyscCompleted: string;
  errMessage: string;

  constructor(
    private router: Router,
    private stateService: StateService,
    private countryService: CountriesService,
    private userService: UsersService,    
    public globalService: GloberService
    ) {
      this.globalService.change$.subscribe(res => this.ngOnInit());
  
    this.cRForm = new FormGroup({
      firstName: new FormControl("", Validators.compose([Validators.required])),
      lastName: new FormControl("", Validators.compose([Validators.required])),
      middleName: new FormControl(""),
      gender: new FormControl("", Validators.compose([Validators.required])),
      dateOfBirth: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      email: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
      mobileNumber: new FormControl(""),
      street_address: new FormControl(""),
      city: new FormControl(""),
      state: new FormControl("", Validators.compose([Validators.required])),
      country: new FormControl("", Validators.compose([Validators.required])),
      prefaredLocation: new FormControl(""),
      tellUsAboutYourSelf: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      cvFile: new FormControl(""),
      cvTitle: new FormControl("", Validators.compose([Validators.required])),
      photoFile: new FormControl(""),
      NYSCDate: new FormControl("", Validators.compose([Validators.required])),
      NTSCcompleted: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      NTSCcompletedDate: new FormControl(
        "",
        Validators.compose([Validators.required])
      )
    });
  }

  ngOnInit() {
    this.loading = true;
    this.error = false;
    this.u = JSON.parse(localStorage.getItem("appUser"));
    this.user = JSON.parse(localStorage.getItem("appUser"));
    this.userService.getSingleUserDetails(this.user.appUserId).subscribe(
      res => {
        console.log(res);
        this.user = res;
        this.birthday = this.formatDate(this.user.birthday);
        this.dateNyscStarted = this.formatDate(this.user.dateNyscStarted);
        this.dateNyscCompleted = this.formatDate(this.user.dateNyscCompleted);
        this.skills = JSON.parse(res["skills"]);
        this.education = JSON.parse(res["education"]);
        this.workHistory = JSON.parse(res["workHistory"]);

        this.loading = false;
      },
      err => {
        console.log(err);
        this.error = true;
        this.loading = false;
      }
    );

    this.getAll();
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  getAll() {
    this.getStates();
  }

  getStates() {
    return this.stateService.getState({ rows: 1000, sord: "asc" }).subscribe(
      res => {
        this.states = res["rows"];
        this.getCountries();
      },
      err => {
        this.error = true;
        this.loading = false;
      }
    );
  }

  getCountries() {
    return this.countryService.getCountries({ rows: 1000 }).subscribe(
      res => {
        this.countries = res["rows"];
        this.loading = false;
      },
      err => {
        this.error = true;
        this.loading = false;
      }
    );
  }

  get firstName() {
    return this.cRForm.get("firstName");
  }

  get lastName() {
    return this.cRForm.get("lastName");
  }

  get middleName() {
    return this.cRForm.get("middleName");
  }

  get gender() {
    return this.cRForm.get("gender");
  }

  get dateOfBirth() {
    return this.cRForm.get("dateOfBirth");
  }

  get mobileNumber() {
    return this.cRForm.get("mobileNumber");
  }

  get email() {
    return this.cRForm.get("email");
  }

  get street_address() {
    return this.cRForm.get("street_address");
  }

  get city() {
    return this.cRForm.get("city");
  }

  get state() {
    return this.cRForm.get("state");
  }

  get country() {
    return this.cRForm.get("country");
  }

  get prefaredLocation() {
    return this.cRForm.get("prefaredLocation");
  }

  get tellUsAboutYourSelf() {
    return this.cRForm.get("tellUsAboutYourSelf");
  }

  get cvFile() {
    return this.cRForm.get("cvFile");
  }

  get cvTitle() {
    return this.cRForm.get("cvTitle");
  }

  get photoFile() {
    return this.cRForm.get("photoFile");
  }

  get NYSCDate() {
    return this.cRForm.get("NYSCDate");
  }

  get NTSCcompleted() {
    return this.cRForm.get("NTSCcompleted");
  }

  get NTSCcompletedDate() {
    return this.cRForm.get("NTSCcompletedDate");
  }

  deleteEducation(index: number) {
    for (let i = 0; i < this.education.length; i++) {
      if (i === index) {
        this.education.splice(i, 1);
      }
    }
  }

  deleteSkill(index) {
    for (let i = 0; i < this.skills.length; i++) {
      if (i === index) {
        this.skills.splice(i, 1);
      }
    }
  }

  deleteWorkHistory(index) {
    for (let i = 0; i < this.workHistory.length; i++) {
      if (i === index) {
        this.workHistory.splice(i, 1);
      }
    }
  }

  detectCvFile($event) {
    this.selectedCvFile = $event.target.files[0];
    this.addCv(this.selectedCvFile);
  }

  check() {
    this.check$ = true;
  }

  detectPhotoFile($event) {
    this.selectedPhotoFile = $event.target.files[0];
    this.addPhoto(this.selectedPhotoFile);
  }

  addCv(cv) {
    this.cv = cv.name;

    let file = Object.assign(
      {},
      {
        documentType: this.cRForm.value.documentType,
        documentName: "My Cv",
        file: cv
      }
    );
    this.cvFile$ = file;
  }

  addPhoto(photo) {
    this.photo = photo.name;

    let file = Object.assign(
      {},
      {
        documentType: this.cRForm.value.documentType,
        documentName: "My Profile Photo",
        file: photo
      }
    );
    this.photoFile$ = file;
  }

  fileUpload() {
    const formData: FormData = new FormData();

    if (this.photoFile$) {
      formData.append(
        "profile",
        this.photoFile$.file,
        this.photoFile$.file.name
      );
    }

    formData.append("cv", this.cvFile$.file, this.cvFile$.file.name);

    // this.documents.forEach(doc => {
    //   formData.append(doc.documentName, doc.file, doc.file.name);
    //   this.Files.push({ docName: doc.documentName, file: doc.file.name });
    // });

    return formData;
  }

  submit() {
    this.Finish = "Loading...";
    this.error2 = false;

    if (!this.cvFile$ && !this.photoFile$) {
      console.log(1);

      const upload: FormData = new FormData();
      const jsonse = JSON.stringify({
        cv: this.user.cv,
        cvTitle: this.cRForm.value.cvTitle,
        profileImage: this.user.profileImage,
        nyscCompleted: this.cRForm.value.NTSCcompleted,
        dateNyscCompleted: this.cRForm.value.NYSCDate,
        dateNyscStarted: this.cRForm.value.NTSCcompletedDate,
        firstName: this.cRForm.value.firstName,
        lastName: this.cRForm.value.lastName,
        birthday: this.cRForm.value.dateOfBirth,
        gender: this.cRForm.value.gender,
        province: this.cRForm.value.state,
        cvtext: this.cRForm.value.tellUsAboutYourSelf,
        address1: this.cRForm.value.street_address,
        city: this.cRForm.value.city,
        country: this.cRForm.value.country,
        email: this.cRForm.value.email,
        mobilePhone: this.cRForm.value.mobileNumber,
        workHistory: JSON.stringify(this.workHistory),
        education: JSON.stringify(this.education),
        skills: JSON.stringify(this.skills)
      });
      const data = new Blob([jsonse], { type: "application/json" });
      upload.append("data", data);
      this.userService
        .completeRegistration({
          appUserId: this.u.appUserId,
          body: upload
        })
        .subscribe(
          res => {
            this.router.navigate(["/profile"]);
          },
          err => {
            this.Finish = "Save";
            this.errMessage = err.error;
            this.error2 = true;

            setTimeout(() => {
              this.error2 = false;
            }, 2000);
          }
        );
    } else if (this.cvFile$ && this.photoFile$) {
      console.log(2);

      const upload = this.fileUpload();
      const jsonse = JSON.stringify({
        cvTitle: this.cRForm.value.cvTitle,
        nyscCompleted: this.cRForm.value.NTSCcompleted,
        dateNyscCompleted: this.cRForm.value.NYSCDate,
        dateNyscStarted: this.cRForm.value.NTSCcompletedDate,
        firstName: this.cRForm.value.firstName,
        lastName: this.cRForm.value.lastName,
        birthday: this.cRForm.value.dateOfBirth,
        gender: this.cRForm.value.gender,
        province: this.cRForm.value.state,
        cvtext: this.cRForm.value.tellUsAboutYourSelf,
        address1: this.cRForm.value.street_address,
        city: this.cRForm.value.city,
        country: this.cRForm.value.country,
        email: this.cRForm.value.email,
        mobilePhone: this.cRForm.value.mobileNumber,
        workHistory: JSON.stringify(this.workHistory),
        education: JSON.stringify(this.education),
        skills: JSON.stringify(this.skills)
      });
      const data = new Blob([jsonse], { type: "application/json" });
      upload.append("data", data);
      this.userService
        .completeRegistration({
          appUserId: this.u.appUserId,
          body: upload
        })
        .subscribe(
          res => {
            this.router.navigate(["/profile"]);
          },
          err => {
            this.Finish = "Save";
            this.errMessage = err.error;
            this.error2 = true;

            setTimeout(() => {
              this.error2 = false;
            }, 2000);
          }
        );
    } else if (this.photoFile$) {
      console.log(3);

      const upload = this.fileUpload();
      const jsonse = JSON.stringify({
        cv: this.user.cv,
        cvTitle: this.cRForm.value.cvTitle,
        nyscCompleted: this.cRForm.value.NTSCcompleted,
        dateNyscCompleted: this.cRForm.value.NYSCDate,
        dateNyscStarted: this.cRForm.value.NTSCcompletedDate,
        firstName: this.cRForm.value.firstName,
        lastName: this.cRForm.value.lastName,
        birthday: this.cRForm.value.dateOfBirth,
        gender: this.cRForm.value.gender,
        province: this.cRForm.value.state,
        cvtext: this.cRForm.value.tellUsAboutYourSelf,
        address1: this.cRForm.value.street_address,
        city: this.cRForm.value.city,
        country: this.cRForm.value.country,
        email: this.cRForm.value.email,
        mobilePhone: this.cRForm.value.mobileNumber,
        workHistory: JSON.stringify(this.workHistory),
        education: JSON.stringify(this.education),
        skills: JSON.stringify(this.skills)
      });
      const data = new Blob([jsonse], { type: "application/json" });
      upload.append("data", data);
      this.userService
        .completeRegistration({
          appUserId: this.u.appUserId,
          body: upload
        })
        .subscribe(
          res => {
            this.router.navigate(["/profile"]);
          },
          err => {
            this.Finish = "Save";
            this.errMessage = err.error;
            this.error2 = true;

            setTimeout(() => {
              this.error2 = false;
            }, 2000);
          }
        );
    } else {
      console.log(4);

      const upload = this.fileUpload();
      const jsonse = JSON.stringify({
        profileImage: this.user.profileImage,
        nyscCompleted: this.cRForm.value.NTSCcompleted,
        dateNyscCompleted: this.cRForm.value.NYSCDate,
        dateNyscStarted: this.cRForm.value.NTSCcompletedDate,
        firstName: this.cRForm.value.firstName,
        lastName: this.cRForm.value.lastName,
        birthday: this.cRForm.value.dateOfBirth,
        gender: this.cRForm.value.gender,
        province: this.cRForm.value.state,
        cvTitle: this.cRForm.value.cvTitle,
        cvtext: this.cRForm.value.tellUsAboutYourSelf,
        address1: this.cRForm.value.street_address,
        city: this.cRForm.value.city,
        country: this.cRForm.value.country,
        email: this.cRForm.value.email,
        mobilePhone: this.cRForm.value.mobileNumber,
        workHistory: JSON.stringify(this.workHistory),
        education: JSON.stringify(this.education),
        skills: JSON.stringify(this.skills)
      });
      const data = new Blob([jsonse], { type: "application/json" });
      upload.append("data", data);
      this.userService
        .completeRegistration({
          appUserId: this.u.appUserId,
          body: upload
        })
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(["/profile"]);
          },
          err => {
            this.Finish = "Save";
            this.errMessage = err.error;
            this.error2 = true;

            setTimeout(() => {
              this.error2 = false;
            }, 2000);
          }
        );
    }
  }

  editEducation(i) {
    this.router.navigate([`/edit-education/${i}`]);
  }

  editSkill(i) {
    this.router.navigate([`/edit-skill/${i}`]);
  }

  editWorkHistory(i) {
    console.log(i);

    this.router.navigate([`/edit-work-history/${i}`]);
  }
}
