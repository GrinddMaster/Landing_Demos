import sdkPointer from './Models/pointer';
import { setupSandBox } from './Models/Tags/sand_box_tag';
import testTag from './Models/Tags/test_tag';

export default async function sdkInterface(mpSdk) {
  setupSandBox(mpSdk);
}
