import { RadioOptionInterface } from "@components/inputs/radio-input/RadioInput";
import { statusMap } from "@data/sideBar";
import {
  StatusType,
  privacySettingsID,
  activitySettingsID,
  permissionSettingsID,
  privacyStates,
  activeStates,
  permissionStates,
} from "types/sideBar";

function ExtractData(
  type: StatusType | undefined,
  currStatus: string | undefined,
  itemStatus:
    | privacySettingsID
    | activitySettingsID
    | permissionSettingsID
    | undefined
): DataInterface {
  switch (type) {
    case StatusType.PRIVACY:
      return getPrivacyData(itemStatus as privacySettingsID, currStatus);
    case StatusType.ACTIVITY:
      return getActivityData(itemStatus as activitySettingsID, currStatus);
    case StatusType.PERMISSION:
      return getPermissionData(itemStatus as permissionSettingsID, currStatus);
    default:
      return { getData: () => ({}) };
  }
}

interface DataInterface {
  getData: () => object;
}

function getPrivacyData(
  privacyStatus: privacySettingsID | undefined,
  currStatus: string | undefined
): DataInterface {
  return {
    getData: () => {
      let keyOptions;
      let valueOptions: string[];
      let data: any;
      if (privacyStatus !== undefined) {
        const rowInfo = statusMap.privacy[privacyStatus];
        valueOptions = Object.values(privacyStates);

        keyOptions = Object.keys(privacyStates);

        const radioOptions: RadioOptionInterface[] = [];

        keyOptions.map((item, index) => {
          radioOptions.push({
            id: item,
            label: valueOptions[index],
            value: item,
          } as RadioOptionInterface);
        });

        data = {
          header: rowInfo?.name,
          state: currStatus,
          data: {
            id: rowInfo?.id,
            title: rowInfo?.subtitle,
            options: radioOptions,
          },
          updateFnType: StatusType.PRIVACY,
        };
      }
      return data;
    },
  };
}

function getActivityData(
  activityStatus: activitySettingsID | undefined,
  currStatus: string | undefined
): DataInterface {
  return {
    getData: () => {
      let keyOptions;
      let valueOptions: string[];
      let data: any;
      if (activityStatus !== undefined) {
        const rowInfo = statusMap.activity[activityStatus];
        valueOptions = Object.values(activeStates);

        keyOptions = Object.keys(activeStates);

        const radioOptions: RadioOptionInterface[] = [];

        keyOptions.map((item, index) => {
          radioOptions.push({
            id: item,
            label: valueOptions[index],
            value: item,
          } as RadioOptionInterface);
        });

        data = {
          header: rowInfo?.name,
          state: currStatus,
          data: {
            id: rowInfo?.id,
            title: rowInfo?.subtitle,
            options: radioOptions,
          },
          updateFnType: StatusType.ACTIVITY,
        };
      }
      return data;
    },
  };
}

function getPermissionData(
  permissionStatus: permissionSettingsID | undefined,
  currStatus: string | undefined
): DataInterface {
  return {
    getData: () => {
      let keyOptions;
      let valueOptions: string[];
      let data: any;
      if (permissionStatus !== undefined) {
        const rowInfo = statusMap.permission[permissionStatus];
        valueOptions = Object.values(permissionStates);

        keyOptions = Object.keys(permissionStates);

        const radioOptions: RadioOptionInterface[] = [];

        keyOptions.map((item, index) => {
          radioOptions.push({
            id: item,
            label: valueOptions[index],
            value: item,
          } as RadioOptionInterface);
        });

        data = {
          header: rowInfo?.name,
          state: currStatus,
          data: {
            id: rowInfo?.id,
            title: rowInfo?.subtitle,
            options: radioOptions,
          },
          updateFnType: StatusType.PERMISSION,
        };
      }
      return data;
    },
  };
}

export { ExtractData };
export type { DataInterface };
