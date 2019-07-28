import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { StateService } from "src/app/services/state.service";
import { CountriesService } from "src/app/services/countries.service";
import { UsersService } from "src/app/services/users.service";
import { GloberService } from "src/app/services/glober.service";
import { CategoryService } from "src/app/services/category.service";
import { AngularEditorConfig } from "@kolkov/angular-editor";

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
  categories: any[];
  degree: any[];
  selectedItems = [];
  loading: boolean;
  education: any[];
  workHistory: any[];
  referees: any[];
  language: any[];
  skills: any[];
  selectedCvFile: any;
  selectedPhotoFile: any;
  documents = [];
  Files = [];
  cv: string;
  photo: string;
  error: boolean;
  error2: boolean;
  error3: boolean;
  success: boolean;
  check$ = false;
  cvFile$: any;
  photoFile$: any;
  Finish = "Save";
  u: any;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    placeholder: "Enter text here...",
    translate: "no",
    uploadUrl: "assets/upload" // if needed
  };

  dropdownSettings = {
    singleSelection: false,
    idField: "id",
    textField: "name",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    allowSearchFilter: true,
    limitSelection: 3
  };

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
  MiddleName = "";
  constructor(
    private router: Router,
    private stateService: StateService,
    private countryService: CountriesService,
    private userService: UsersService,
    public globalService: GloberService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.globalService.change$.subscribe(res => this.ngOnInit());
  }

  ngOnInit() {
    this.cRForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      middleName: [""],
      gender: ["", [Validators.required]],
      dateOfBirth: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      mobileNumber: [""],
      street_address: [""],
      city: [""],
      state: ["", [Validators.required]],
      country: ["", [Validators.required]],
      prefaredLocation: ["", [Validators.required]],
      expectedSalary: ["", [Validators.required]],
      tellUsAboutYourSelf: ["", [Validators.required]],
      cvFile: [""],
      // cvTitle: ["", [Validators.required]],
      photoFile: [""],
      maritalStatus: ["", [Validators.required]],
      preferedPositions: ["", [Validators.required]],
      NTSCcompleted: ["", [Validators.required]],
      NYSCDate: [""],
      NTSCcompletedDate: [""]
      // howDidYouHereAboutUs: [
      //   "",
      //   [Validators.required])
      // )
    });

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
        this.referees = JSON.parse(res["referees"]);
        this.language = JSON.parse(res["languages"]);
        this.selectedItems = JSON.parse(res["preferedPositions"]).map(d => {
          var i = {
            name: d
          };
          return i;
        });

        this.cRForm.value.preferedPositions = JSON.stringify(
          this.selectedItems
        );
      },
      err => {
        console.log(err);
        this.error = true;
        this.loading = false;
      }
    );

    this.getAll();
  }

  onItemSelect(item: any) {
    this.selectedItems.push(item);
    this.cRForm.value.preferedPositions = JSON.stringify(this.selectedItems);
  }
  onSelectAll(items: any[]) {
    this.selectedItems.concat(items);
    this.cRForm.value.preferedPositions = JSON.stringify(this.selectedItems);
  }

  onDeSelect(item: any) {
    this.selectedItems.filter(i => {
      return i.idField != item.idField;
    });
    this.cRForm.value.preferedPositions = JSON.stringify(this.selectedItems);
  }

  onDeSelectAll(items: any[]) {
    this.selectedItems = [];
    this.cRForm.value.preferedPositions = JSON.stringify(this.selectedItems);
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
        this.getCategories();
      },
      err => {
        this.error = true;
        this.loading = false;
      }
    );
  }

  getCategories() {
    return this.categoryService
      .getCategorries({
        rows: 2000
      })
      .subscribe(
        res => {
          this.categories = res["rows"];

          let f = this.selectedItems;

          console.log("f", f);

          let selectedItems = f.map(d =>
            this.categories.filter(i => i.name === d.name)
          );

          this.selectedItems = [].concat.apply([], selectedItems);

          console.log(this.selectedItems);

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

  get maritalStatus() {
    return this.cRForm.get("maritalStatus");
  }

  get preferedPositions() {
    return this.cRForm.get("preferedPositions");
  }

  get expectedSalary() {
    return this.cRForm.get("expectedSalary");
  }

  get tellUsAboutYourSelf() {
    return this.cRForm.get("tellUsAboutYourSelf");
  }

  get cvFile() {
    return this.cRForm.get("cvFile");
  }

  // get cvTitle() {
  //   return this.cRForm.get("cvTitle");
  // }

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

  deleteReferees(index) {
    for (let i = 0; i < this.referees.length; i++) {
      if (i === index) {
        this.referees.splice(i, 1);
      }
    }
  }

  deleteLanguage(index) {
    for (let i = 0; i < this.language.length; i++) {
      if (i === index) {
        this.language.splice(i, 1);
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

    if (this.cvFile$) {
      formData.append("cv", this.cvFile$.file, this.cvFile$.file.name);
    }

    // this.documents.forEach(doc => {
    //   formData.append(doc.documentName, doc.file, doc.file.name);
    //   this.Files.push({ docName: doc.documentName, file: doc.file.name });
    // });

    return formData;
  }

  submit() {
    this.Finish = "Loading...";
    this.error2 = false;
    this.cRForm.value.preferedPositions.map(data => {
      return data["name"];
    });

    let birthday;
    let dateNyscCompleted;
    let dateNyscStarted;

    if (this.cRForm.value.dateOfBirth && this.cRForm.value.dateOfBirth.year
      && this.cRForm.value.dateOfBirth.month && this.cRForm.value.dateOfBirth.day ) {
      birthday = `${this.cRForm.value.dateOfBirth.year}-${this.cRForm.value.dateOfBirth.month}-${this.cRForm.value.dateOfBirth.day}`;
    } else {
      birthday = null;
    }

    if (this.cRForm.value.NYSCDate && this.cRForm.value.NYSCDate.year
      && this.cRForm.value.NYSCDate.month && this.cRForm.value.NYSCDate.day) {
      dateNyscCompleted = `${this.cRForm.value.NYSCDate.year}-${this.cRForm.value.NYSCDate.month}-${this.cRForm.value.NYSCDate.day}`;
    } else {
      dateNyscCompleted = null;
    }

    if (this.cRForm.value.NTSCcompletedDate && this.cRForm.value.NTSCcompletedDate.year
      && this.cRForm.value.NTSCcompletedDate.month &&    this.cRForm.value.NTSCcompletedDate.day) {
      dateNyscStarted = `${this.cRForm.value.NTSCcompletedDate.year}-${this.cRForm.value.NTSCcompletedDate.month}-${this.cRForm.value.NTSCcompletedDate.day}`;
    } else {
      dateNyscStarted = null;
    }
    let category = this.cRForm.value.preferedPositions.map(data => {
      return data["name"];
    });

    let categories = this.removeDuplicates(category);

    if (!this.cvFile$ && !this.photoFile$) {
      const upload: FormData = new FormData();
      const jsonse = JSON.stringify({
        cv: this.user.cv,
        cvTitle: this.user.cvTitle,
        profileImage: this.user.profileImage,
        nyscCompleted: this.cRForm.value.NTSCcompleted,
        dateNyscCompleted: dateNyscCompleted ,
        dateNyscStarted: dateNyscStarted ,
        firstName: this.cRForm.value.firstName,
        lastName: this.cRForm.value.lastName,
        birthday: birthday ,
        preferedPositions: JSON.stringify(categories),
        maritalStatus: this.cRForm.value.maritalStatus,
        preferedCountries: this.cRForm.value.prefaredLocation,
        expectedSalary: this.cRForm.value.expectedSalary,
        gender: this.cRForm.value.gender,
        province: this.cRForm.value.state,
        cvtext: this.cRForm.value.tellUsAboutYourSelf,
        address1: this.cRForm.value.street_address,
        city: this.cRForm.value.city,
        country: this.cRForm.value.country,
        email: this.cRForm.value.email,
        percentage: this.user.percentage,
        mobilePhone: this.cRForm.value.mobileNumber,
        workHistory: JSON.stringify(this.workHistory),
        education: JSON.stringify(this.education),
        skills: JSON.stringify(this.skills),
        referees: JSON.stringify(this.referees),
        languages: JSON.stringify(this.language)
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
      const upload = this.fileUpload();
      const jsonse = JSON.stringify({
        cvTitle: this.user.cvTitle,
        nyscCompleted: this.cRForm.value.NTSCcompleted,
        dateNyscCompleted: dateNyscCompleted ,
        dateNyscStarted: dateNyscStarted ,
        firstName: this.cRForm.value.firstName,
        lastName: this.cRForm.value.lastName,
        birthday: birthday,
        preferedPositions: JSON.stringify(categories),
        maritalStatus: this.cRForm.value.maritalStatus,
        preferedCountries: this.cRForm.value.prefaredLocation,
        expectedSalary: this.cRForm.value.expectedSalary,
        gender: this.cRForm.value.gender,
        province: this.cRForm.value.state,
        cvtext: this.cRForm.value.tellUsAboutYourSelf,
        address1: this.cRForm.value.street_address,
        city: this.cRForm.value.city,
        country: this.cRForm.value.country,
        email: this.cRForm.value.email,
        percentage: this.user.percentage,
        mobilePhone: this.cRForm.value.mobileNumber,
        workHistory: JSON.stringify(this.workHistory),
        education: JSON.stringify(this.education),
        skills: JSON.stringify(this.skills),
        referees: JSON.stringify(this.referees),
        languages: JSON.stringify(this.language)
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
      const upload = this.fileUpload();
      const jsonse = JSON.stringify({
        cv: this.user.cv,
        cvTitle: this.user.cvTitle,
        nyscCompleted: this.cRForm.value.NTSCcompleted,
        dateNyscCompleted: this.cRForm.value.NYSCDate || "",
        dateNyscStarted: this.cRForm.value.NTSCcompletedDate || "",
        firstName: this.cRForm.value.firstName,
        lastName: this.cRForm.value.lastName,
        birthday: this.cRForm.value.dateOfBirth,
        preferedPositions: JSON.stringify(categories),
        maritalStatus: this.cRForm.value.maritalStatus,
        preferedCountries: this.cRForm.value.prefaredLocation,
        expectedSalary: this.cRForm.value.expectedSalary,
        gender: this.cRForm.value.gender,
        province: this.cRForm.value.state,
        cvtext: this.cRForm.value.tellUsAboutYourSelf,
        address1: this.cRForm.value.street_address,
        city: this.cRForm.value.city,
        country: this.cRForm.value.country,
        email: this.cRForm.value.email,
        percentage: this.user.percentage,
        mobilePhone: this.cRForm.value.mobileNumber,
        workHistory: JSON.stringify(this.workHistory),
        education: JSON.stringify(this.education),
        skills: JSON.stringify(this.skills),
        referees: JSON.stringify(this.referees),
        languages: JSON.stringify(this.language)
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
      const upload = this.fileUpload();
      const jsonse = JSON.stringify({
        profileImage: this.user.profileImage,
        nyscCompleted: this.cRForm.value.NTSCcompleted,
        dateNyscCompleted: this.cRForm.value.NYSCDate || "",
        dateNyscStarted: this.cRForm.value.NTSCcompletedDate || "",
        firstName: this.cRForm.value.firstName,
        lastName: this.cRForm.value.lastName,
        birthday: this.cRForm.value.dateOfBirth,
        preferedPositions: JSON.stringify(categories),
        maritalStatus: this.cRForm.value.maritalStatus,
        preferedCountries: this.cRForm.value.prefaredLocation,
        expectedSalary: this.cRForm.value.expectedSalary,
        gender: this.cRForm.value.gender,
        province: this.cRForm.value.state,
        cvTitle: this.user.cvTitle,
        cvtext: this.cRForm.value.tellUsAboutYourSelf,
        address1: this.cRForm.value.street_address || "",
        city: this.cRForm.value.city || "",
        country: this.cRForm.value.country,
        email: this.cRForm.value.email,
        percentage: this.user.percentage,
        mobilePhone: this.cRForm.value.mobileNumber,
        workHistory: JSON.stringify(this.workHistory),
        education: JSON.stringify(this.education),
        skills: JSON.stringify(this.skills),
        referees: JSON.stringify(this.referees),
        languages: JSON.stringify(this.language)
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
    this.router.navigate([`/edit-work-history/${i}`]);
  }

  editReferees(i) {
    this.router.navigate([`/edit-referees/${i}`]);
  }

  editLanguage(i) {
    this.router.navigate([`/edit-language/${i}`]);
  }

  resendEmailVerification() {
    this.loading = true;
    this.error3 = false;
    this.success = false;
    this.userService.resendEmailVerification(this.u.appUserId).subscribe(
      res => {
        this.loading = false;
        this.success = true;

        setTimeout(() => {
          this.success = false;
        }, 2000);
      },
      err => {
        this.error3 = true;
        this.loading = false;
      }
    );
  }

  private removeDuplicates(arr: any[]) {
    let unique_array = arr.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    });
    return unique_array;
  }
}
