import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView, SectionList, Text, View } from 'react-native';
import { useOverlay } from '../shared/ui/OverlayContext';
import Button from '../shared/ui/button/Button';
import BottomSheetModal from '../shared/ui/modals/BottomSheetModal';
import GlobalModal from '../shared/ui/modals/GlobalModal';
import SecondModal from '../shared/ui/modals/SecondModal';
import { useToast } from '../shared/ui/modals/useToast';
import Typography from '../shared/ui/typography/Typography';


const StyleguideScreen = () =>
{
    const navigation = useNavigation();
    const { showOverlay, hideOverlay } = useOverlay();
    const toast = useToast();
    const { t } = useTranslation();

    const handleShowToast = () =>
    {
        toast( t( 'styleguide.toast.message' ) );
    };

    const handleShowBottomSheet = () =>
    {
        showOverlay(
            <BottomSheetModal
                title={t( 'styleguide.bottomSheet.title' )}
                onClose={hideOverlay}
                height={340}
                indicatorColor="#E94057"
            >
                <View style={{ alignItems: 'center', padding: 12 }}>
                    <Text style={{ fontSize: 32, marginBottom: 8 }}>📋</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>{t( 'styleguide.bottomSheet.demoTitle' )}</Text>
                    <Text style={{ color: '#666', marginBottom: 16, textAlign: 'center' }}>
                        {t( 'styleguide.bottomSheet.demoDescription' )}
                    </Text>
                    <Button title={t( 'styleguide.bottomSheet.action' )} onPress={() => { toast( t( 'styleguide.bottomSheet.actionMessage' ) ); hideOverlay(); }} />
                </View>
            </BottomSheetModal>
        );
    };

    const handleShowBottomSheetList = () =>
    {
        showOverlay(
            <BottomSheetModal
                title={t( 'styleguide.bottomSheetList.title' )}
                onClose={hideOverlay}
                height={420}
                indicatorColor="#E94057"
            >
                <View style={{ maxHeight: 320 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>{t( 'styleguide.bottomSheetList.scrollableListTitle' )}</Text>
                    <ScrollView style={{ maxHeight: 260 }}>
                        {Array.from( { length: 20 } ).map( ( _, i ) => (
                            <View key={i} style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
                                <Text>{t( 'styleguide.bottomSheetList.element', { index: i + 1 } )}</Text>
                            </View>
                        ) )}
                    </ScrollView>
                    <Button title={t( 'styleguide.bottomSheetList.close' )} onPress={hideOverlay} style={{ marginTop: 12 }} />
                </View>
            </BottomSheetModal>
        );
    };

    const handleShowGlobalModal = () =>
    {
        showOverlay(
            <GlobalModal
                onClose={hideOverlay}
                onOpenSecond={() =>
                {
                    showOverlay( <SecondModal onClose={hideOverlay} /> );
                }}
            />
        );
    };

    const handleShowSecondModal = () =>
    {
        showOverlay( <SecondModal onClose={hideOverlay} /> );
    };

    const interactiveSection = {
        title: t( 'styleguide.interactiveExamples.title' ),
        data: [ [
            { label: t( 'styleguide.interactiveExamples.toast' ), element: <Button title={t( 'styleguide.interactiveExamples.showToast' )} onPress={handleShowToast} /> },
            { label: t( 'styleguide.interactiveExamples.bottomSheet' ), element: <Button title={t( 'styleguide.interactiveExamples.showBottomSheet' )} onPress={handleShowBottomSheet} /> },
            { label: t( 'styleguide.interactiveExamples.bottomSheetList' ), element: <Button title={t( 'styleguide.interactiveExamples.showBottomSheetList' )} onPress={handleShowBottomSheetList} /> },
            { label: t( 'styleguide.interactiveExamples.globalModal' ), element: <Button title={t( 'styleguide.interactiveExamples.showGlobalModal' )} onPress={handleShowGlobalModal} /> },
            { label: t( 'styleguide.interactiveExamples.secondModal' ), element: <Button title={t( 'styleguide.interactiveExamples.showSecondModal' )} onPress={handleShowSecondModal} /> },
            { label: t( 'styleguide.interactiveExamples.actionList' ), element: <Button title={t( 'styleguide.interactiveExamples.actionListDemo' )} onPress={() => navigation.navigate( 'ActionListDemo' as never )} /> },
            { label: t( 'styleguide.interactiveExamples.collapsibleHeader' ), element: <Button title={t( 'styleguide.interactiveExamples.collapsibleHeaderDemo' )} onPress={() => navigation.navigate( 'CollapsibleHeaderDemo' as never )} /> },
            { label: t( 'styleguide.interactiveExamples.errorState' ), element: <Button title={t( 'styleguide.interactiveExamples.errorStateDemo' )} onPress={() => navigation.navigate( 'ErrorStateDemo' as never )} /> },
            { label: t( 'styleguide.interactiveExamples.fabScrollToTop' ), element: <Button title={t( 'styleguide.interactiveExamples.fabScrollToTopDemo' )} onPress={() => navigation.navigate( 'FABScrollToTopDemo' as never )} /> },
        ] ],
    };
    const allSections = [ interactiveSection, ...styleguideSections ];
    return (
        <SectionList
            sections={allSections}
            keyExtractor={( _, idx ) => idx.toString()}
            renderSectionHeader={( { section: { title } } ) => (
                <Typography variant="h2" weight="bold" style={{ marginTop: 16, marginBottom: 8 }}>{title}</Typography>
            )}
            renderItem={( { item } ) => (
                <FlatList
                    data={item}
                    horizontal
                    keyExtractor={( _, idx ) => idx.toString()}
                    renderItem={( { item } ) => (
                        <View style={{ alignItems: 'center', marginRight: 16 }}>
                            <Text style={{ fontSize: 13, color: '#888', marginBottom: 6 }}>{item.label}</Text>
                            {item.element}
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 16, paddingBottom: 8, paddingHorizontal: 16 }}
                />
            )}
            stickySectionHeadersEnabled={false}
            contentContainerStyle={{ paddingBottom: 32 }}
            ListFooterComponent={<View style={{ height: 32 }} />}
        />
    );
};

export default StyleguideScreen; 