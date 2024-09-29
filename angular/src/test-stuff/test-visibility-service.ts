import { BehaviorSubject } from "rxjs";
import { VisibilityService } from "../app/visibility.service"
interface iVisibilityResp{
    control:BehaviorSubject<boolean>,
    service:Pick<VisibilityService, keyof VisibilityService>,
    elementInSight:jasmine.Spy,
}
const makeFakeVisiblityService = (state:boolean = false)=>{
    const control:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(state);
    const service:Pick<VisibilityService, keyof VisibilityService> = {
        elementInSight(element) {
            return control
        }
      }
      const elementInSight = spyOn(service, 'elementInSight').and.returnValue(control);
    return {control, service, elementInSight} as iVisibilityResp
      
}

export default makeFakeVisiblityService