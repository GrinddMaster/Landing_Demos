import { CommonMpSdk } from '@matterport/sdk/sdk';
import { setupSandBox,reserveBox } from './Models/Tags/sand_box_tag';

export default async function sdkInterface(mpSdk:CommonMpSdk) {
  setupSandBox(mpSdk);
  reserveBox (mpSdk);
}
