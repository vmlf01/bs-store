import { IUserProfile } from '../../../interfaces/IUserProfile';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDropdownComponent } from './user-dropdown.component';

describe('UserDropdownComponent', () => {
    let component: UserDropdownComponent;
    let fixture: ComponentFixture<UserDropdownComponent>;

    const mockProfile: IUserProfile = {
        id: 'id-1',
        email: 'example@abc.com',
        name: 'Jane Doe',
        picture: '',
        role: 'BUYER',
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserDropdownComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDropdownComponent);
        component = fixture.componentInstance;
        component.profile = mockProfile;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
