import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators
} from "@angular/forms";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { StateService } from "src/app/services/state.service";
import { CountriesService } from "src/app/services/countries.service";
import { monthOfTheYear } from "src/app/mock/months";
import { skillLevel } from "src/app/mock/stillLevel";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-complete-registration",
  templateUrl: "./complete-registration.component.html",
  styleUrls: ["./complete-registration.component.css"]
})
export class CompleteRegistrationComponent implements OnInit {
  user: any;
  firstName$: string;
  lastName$: string;
  mobileNumber$: string;
  email$: string;
  cRForm: FormGroup;
  states: any[];
  countries: any[];
  firstCheck$ = false;
  secondCheck$ = false;
  thirdCheck$ = false;
  forthCheck$ = false;
  fifthCheck$ = false;
  loading: boolean;
  months = monthOfTheYear;
  skillLevel = skillLevel;
  selectedCvFile: any;
  selectedPhotoFile: any;
  documents = [];
  Files = [];
  cv: string;
  photo: string;
  error: boolean;
  error2: boolean;
  cvFile$: any;
  photoFile$: any;
  Finish = "Finish";
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

  constructor(
    private fb: FormBuilder,
    private calendar: NgbCalendar,
    private router: Router,
    private stateService: StateService,
    private countryService: CountriesService,
    private userService: UsersService
  ) {
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
      NYSCDate: new FormControl("", Validators.compose([Validators.required])),
      NTSCcompleted: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      NTSCcompletedDate: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      howDidYouHereAboutUs: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      tellUsAboutYourSelf: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      cvFile: new FormControl("", Validators.compose([Validators.required])),
      photoFile: new FormControl(""),
      education: this.fb.array([]),
      workHistory: this.fb.array([]),
      skills: this.fb.array([])
    });

    this.addEducation();
    this.addWorkHistory();
    this.addSkill();
  }

  ngOnInit() {
    this.loading = true;
    this.error = false;
    this.user = JSON.parse(localStorage.getItem("appUser"));
    if (this.user) {
      this.firstName$ = this.user.firstName;
      this.lastName$ = this.user.lastName;
      this.email$ = this.user.appUserEmail;
      this.mobileNumber$ = this.user.mobileNumber;
    }

    this.getAll();
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

  get educationForms() {
    return this.cRForm.get("education") as FormArray;
  }

  addEducation() {
    const education = this.fb.group({
      institution: ["", Validators.required],
      degree: ["", Validators.required],
      country: ["", Validators.required],
      fromYear: ["", Validators.required],
      fromMonth: ["", Validators.required],
      toYear: ["", Validators.required],
      toMonth: ["", Validators.required],
      course: ["", Validators.required]
    });

    this.educationForms.push(education);
  }

  deleteEducation(i) {
    this.educationForms.removeAt(i);
  }

  get workHistoryForms() {
    return this.cRForm.get("workHistory") as FormArray;
  }

  addWorkHistory() {
    const workHistory = this.fb.group({
      company: ["", Validators.required],
      jobTitle: ["", Validators.required],
      country: ["", Validators.required],
      fromYear: ["", Validators.required],
      fromMonth: ["", Validators.required],
      toYear: ["", Validators.required],
      toMonth: ["", Validators.required]
    });

    this.workHistoryForms.push(workHistory);
  }

  deleteWorkHistory(i) {
    this.workHistoryForms.removeAt(i);
  }

  get skillsForms() {
    return this.cRForm.get("skills") as FormArray;
  }

  addSkill() {
    const skill = this.fb.group({
      skill: ["", Validators.required],
      skillLevel: ["", Validators.required],
      lastYearUsed: ["", Validators.required],
      lastMonthUsed: ["", Validators.required],
      yearsOfExperience: ["", Validators.required]
    });

    this.skillsForms.push(skill);
  }

  deleteSkill(i) {
    this.skillsForms.removeAt(i);
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

  get NYSCDate() {
    return this.cRForm.get("NYSCDate");
  }

  get NTSCcompleted() {
    return this.cRForm.get("NTSCcompleted");
  }

  get NTSCcompletedDate() {
    return this.cRForm.get("NTSCcompletedDate");
  }

  get howDidYouHereAboutUs() {
    return this.cRForm.get("howDidYouHereAboutUs");
  }

  get tellUsAboutYourSelf() {
    return this.cRForm.get("tellUsAboutYourSelf");
  }

  get cvFile() {
    return this.cRForm.get("cvFile");
  }

  get photoFile() {
    return this.cRForm.get("photoFile");
  }

  firstCheck() {
    this.firstCheck$ = true;
  }

  secondCheck() {
    this.secondCheck$ = true;
  }

  thirdCheck() {
    this.thirdCheck$ = true;
  }

  forthCheck() {
    this.forthCheck$ = true;
  }

  fifthCheck() {
    this.fifthCheck$ = true;
  }

  detectCvFile($event) {
    this.selectedCvFile = $event.target.files[0];
    this.addCv(this.selectedCvFile);
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
        this.photoFile$.documentName,
        this.photoFile$.file,
        this.photoFile$.file.name
      );
    }

    formData.append(
      this.cvFile$.documentName,
      this.cvFile$.file,
      this.cvFile$.file.name
    );

    // this.documents.forEach(doc => {
    //   formData.append(doc.documentName, doc.file, doc.file.name);
    //   this.Files.push({ docName: doc.documentName, file: doc.file.name });
    // });

    return formData;
  }

  submit() {
    this.Finish = "Loading...";
    this.error2 = false;
    const upload = this.fileUpload();
    const jsonse = JSON.stringify({
      nyscCompleted: this.cRForm.value.NTSCcompleted,
      dateNyscCompleted: this.cRForm.value.NYSCDate,
      dateNyscStarted: this.cRForm.value.NTSCcompletedDate,
      firstName: this.cRForm.value.firstName,
      lastName: this.cRForm.value.lastName,
      birthday: this.cRForm.value.dateOfBirth,
      gender: this.cRForm.value.gender,
      cvTitle: this.cv,
      address1: this.cRForm.value.street_address,
      city: this.cRForm.value.city,
      country: this.cRForm.value.country,
      email: this.cRForm.value.email,
      mobilePhone: this.cRForm.value.mobileNumber,
      workHistory: JSON.stringify(this.cRForm.value.workHistory),
      education: JSON.stringify(this.cRForm.value.education),
      skills: JSON.stringify(this.cRForm.value.skills)
    });
    const data = new Blob([jsonse], { type: "application/json" });
    upload.append("data", data);
    this.userService
      .completeRegistration({
        appUserId: this.user.appUserId,
        body: upload
      })
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(["/profile"]);
        },
        err => {
          console.log(err);
          this.Finish = "Finish";
          this.error2 = true;
        }
      );
  }

  // log() {
  //   console.log(this.documents);
  //   console.log(this.selectedCvFile);
  // }
}
