import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentRender } from '@/shared/lib/helpers/tests/componentRender/componentRender';
import { Profile } from '@/entity/Profile';
import { Currency } from '@/entity/Currency';
import { Country } from '@/entity/Country';
import { $api } from '@/shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 44,
    currency: Currency.RUB,
    country: Country.Russia,
    username: 'admin111',
    city: 'Moscow',
    avatar: 'https://google.com/img.jpg',
};
const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: { authData: { id: '1', username: 'admin111' } },
    },
    asyncReducers: { profile: profileReducer },

};
describe('feature/EditableProfileCard', () => {
    test('Из режима только чтение переключается в режим редактирования', async () => {
        ComponentRender(<EditableProfileCard id="1" />, options);
        // нажатие кнопки эмулируем
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        // проверка что есть в html верстке компонент с TestId CancelButton
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
    });
    test('при отмене все очищается и подгружаются старые данные', async () => {
        ComponentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        // очищаем поля ProfileCard.Firstname и ProfileCard.Lastname
        await userEvent.clear(screen.getByTestId('ProfileCard.Firstname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.Lastname'));
        // изменение инпута
        await userEvent.type(screen.getByTestId('ProfileCard.Firstname'), 'user');
        await userEvent.type(screen.getByTestId('ProfileCard.Lastname'), 'user');
        // проверяем что данные записались в инпуты
        expect(screen.getByTestId('ProfileCard.Firstname')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.Lastname')).toHaveValue('user');
        // нажимаем кнопку отмена
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));
        // проверяем что данные вернулись старые в инпуты
        expect(screen.getByTestId('ProfileCard.Firstname')).toHaveValue('admin');
        expect(screen.getByTestId('ProfileCard.Lastname')).toHaveValue('admin');
    });

    test('проверка валиадиипри отмене все очищается и подгружаются старые данные', async () => {
        ComponentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        // очищаем поля ProfileCard.Firstname
        await userEvent.clear(screen.getByTestId('ProfileCard.Firstname'));

        // нажимаем кнопку сохранить
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
        // проверяем что есть текст с ошибкой
        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
        // проверяем что есть текст с ошибкой хотябы один
        // expect(screen.getAllByTestId('EditableProfileCard.Error.Paragraph')[0]).toBeInTheDocument();
    });

    test('сохранить данные', async () => {
        const mockPutReq = jest.spyOn($api, 'put'); // почитать о моке апи

        ComponentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        // изменение инпута
        await userEvent.type(screen.getByTestId('ProfileCard.Firstname'), 'user');

        // нажимаем кнопку сохранить
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

        // проверяем что метод вызвался
        expect(mockPutReq).toHaveBeenCalled();
    });
});
