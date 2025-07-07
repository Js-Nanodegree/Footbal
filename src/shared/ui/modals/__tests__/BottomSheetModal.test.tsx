import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import BottomSheetModal from '../BottomSheetModal';

describe( 'BottomSheetModal', () =>
{
    it( 'renders title and children', () =>
    {
        render(
            <BottomSheetModal title="SheetTitle" onClose={() => { }}>
                <span>SheetContent</span>
            </BottomSheetModal>
        );
        expect( screen.getByText( 'SheetTitle' ) ).toBeTruthy();
        expect( screen.getByText( 'SheetContent' ) ).toBeTruthy();
    } );

    it( 'calls onClose when close button pressed', () =>
    {
        const onClose = jest.fn();
        render(
            <BottomSheetModal title="Sheet" onClose={onClose}>
                <span>Content</span>
            </BottomSheetModal>
        );
        fireEvent.press( screen.getByText( 'Закрыть' ) );
        expect( onClose ).toHaveBeenCalled();
    } );
} ); 