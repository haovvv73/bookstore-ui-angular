import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export abstract class UnSub {
    unsubcribe$ = new Subject<void>()

    onUnsubcribe(): void {
        this.unsubcribe$.next()
        this.unsubcribe$.complete()
    }
}
