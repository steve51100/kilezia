import { Component, OnInit } from '@angular/core';
import {ToastController} from "@ionic/angular";
import {MissionDataService} from "../services/mission-data.service";
import {MissionDataModel} from "../models/MissionDataModel";
import {ActivatedRoute} from "@angular/router";
import { ModalController} from '@ionic/angular';


@Component({
  selector: 'app-mission',
  templateUrl: './mission.page.html',
  styleUrls: ['./mission.page.scss'],
})
export class MissionPage implements OnInit {

  mission:MissionDataModel = new MissionDataModel();

  constructor(private activatedRoute: ActivatedRoute, private missionDataService:MissionDataService, private modalController:ModalController) {

  }

  ngOnInit() {
  }

  updateMission() {
    this.missionDataService.updateMission(this.mission);
  }

  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.missionDataService.getMission(id).subscribe(mission => {
        this.mission = mission;
      });
  }
  

}
