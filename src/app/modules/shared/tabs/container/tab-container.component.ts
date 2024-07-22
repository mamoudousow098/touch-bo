import {AfterContentInit, Component, ContentChildren, QueryList} from '@angular/core';
import {TabItemComponent} from "../item/tab-item.component";

@Component({
    selector: 'app-tab-container',
    templateUrl: './tab-container.component.html',
    styleUrls: ['./tab-container.component.css']
})
export class TabContainerComponent implements AfterContentInit {

    @ContentChildren(TabItemComponent) tabs: QueryList<TabItemComponent>;

    ngAfterContentInit(): void {
        // get all active tabs
        let activeTabs = this.tabs.filter((tab) => tab.active);

        // if there is no active tab set, activate the first
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }


    selectTab(tab: TabItemComponent) {
        // deactivate all tabs
        this.tabs.toArray().forEach(tab => tab.active = false);

        // activate the tab the user has clicked on.
        tab.active = true;
    }
}
