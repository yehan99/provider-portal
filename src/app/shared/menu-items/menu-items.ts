import { Injectable } from "@angular/core";

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: "dashboard", name: "Dashboard", type: "link", icon: "av_timer" },
  { state: "patients", type: "link", name: "Patients", icon: "groups" },
  { state: "pathology", type: "link", name: "Pathology", icon: "bloodtype" },
  {
    state: "treatment-plan",
    type: "link",
    name: "Treatment plan",
    icon: "compost",
  },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
