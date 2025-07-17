import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import { Form, Button, Input, DatePicker, addToast, Checkbox } from '@heroui/react';
import { I18nProvider } from '@react-aria/i18n';
import db from '../assets/db';

export default function DataInputTab() {

    const [errors, setErrors] = useState({});
    const latestTariff = useLiveQuery(() => db.tariffs.orderBy('date').last());

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        data.date = new Date(data.date).toISOString();
        console.log(data);

        console.log(latestTariff);
        /*         if (data.egrpou.length !== 8) {
                    setErrors({ egrpou: 'ЕГРПОУ должен состоять из 8 цифр' });
                    return;
                }
                if (autoRenew) data.autoRenew = true;
                else data.autoRenew = false;
                data.dateReg = new Date(data.dateReg).toISOString();
                if (autoRenew) data.dateExp = null;
                else data.dateExp = new Date(data.dateExp).toISOString();
                try {
                    const id = await db.agreements.add({ id: cuid(), ...data });
                    if (id) {
                        addToast({
                            title: 'Новый договор',
                            description: `Добавлен новый договор`,
                            color: 'success',
                        });
                    }
                } catch (error) {
                    addToast({
                        title: 'Новый договор',
                        description: `Ошибка добавления: ${error.message}`,
                        color: 'danger',
                    })
                } */
    };

    return (
        <Form
            className="grid w-full grid-cols-4 gap-4"
            validationErrors={errors}
            onSubmit={onSubmit}
        >
            <Input
                label="Горячая кухня"
                labelPlacement="outside"
                name="hotKitchen"
                radius="sm"
                isRequired
                className="col-span-2"
            />
            <Input
                label="Холодная кухня"
                labelPlacement="outside"
                name="coldKitchen"
                radius="sm"
                isRequired
                className="col-span-2"
            />
            <Input
                label="Горячая санузел"
                labelPlacement="outside"
                name="hotBathroom"
                radius="sm"
                isRequired
                className="col-span-2"
            />
            <Input
                label="Холодная санузел"
                labelPlacement="outside"
                name="coldBathroom"
                radius="sm"
                isRequired
                className="col-span-2"
            />
            <I18nProvider locale="ru-RU">
                <DatePicker
                    isRequired
                    className="col-span-4"
                    label="Дата показаний"
                    name="date"
                    firstDayOfWeek="mon"
                />
            </I18nProvider>
            <Button type="submit" className="col-span-4">Сохранить</Button>
        </Form>
    )
}