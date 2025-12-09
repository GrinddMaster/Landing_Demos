export default async function sdkPointer(mpSdk) {
  mpSdk.Pointer.intersection
    .subscribe((hit) => {
      console.log('Intersection Position:', hit.position);
      console.log('Intersection normal:', hit.normal);
    })
    .catch(console.error);
}
{
  /*
    Turn the started.current variable in /Tour_View.jsx to *false*
    then use this took keep getting the position for the cursor in the tour.
    Use this when you want to determine where you want to put your tags.
    */
}
