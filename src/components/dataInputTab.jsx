import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import { Form, Button, Input, DatePicker, addToast, Checkbox } from '@heroui/react';
import { I18nProvider } from '@react-aria/i18n';
import db from '../assets/db';

export default function DataInputTab() {

    const [errors, setErrors] = useState({});
    const latestTariff = useLiveQuery(() => db.tariffs.orderBy('date').last());
    const latestReadings = useLiveQuery(() => db.readings.orderBy('date').last());

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        data.date = new Date(data.date).toISOString();
        data.hotKitchen = parseFloat(data.hotKitchen);
        data.coldKitchen = parseFloat(data.coldKitchen);
        data.hotBathroom = parseFloat(data.hotBathroom);
        data.coldBathroom = parseFloat(data.coldBathroom);
        data.sewer = data.hotKitchen + data.coldKitchen + data.hotBathroom + data.coldBathroom;
        console.log(data);
        if (latestReadings?.hotBathroom > data.hotBathroom ||
            latestReadings?.coldBathroom > data.coldBathroom ||
            latestReadings?.hotKitchen > data.hotKitchen ||
            latestReadings?.coldKitchen > data.coldKitchen) {
            addToast({
                title: 'Новые показания',
                description: `Новые показания не могут быть меньше предыдущих`,
                color: 'danger',
            })
            return
        }
        try {
            const id = await db.readings.add({ id: cuid(), ...data });
            if (id) {
                addToast({
                    title: 'Новые показания',
                    description: `Добавлены новые показания`,
                    color: 'success',
                });
            }
        } catch (error) {
            addToast({
                title: 'Новые показания',
                description: `Ошибка добавления: ${error.message}`,
                color: 'danger',
            })
        }
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