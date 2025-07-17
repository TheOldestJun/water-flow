import { Button, Form, Input, DatePicker } from "@heroui/react";
import { I18nProvider } from '@react-aria/i18n';

export default function TariffsInputTab() {
    return (
        <Form
            className="grid w-full grid-cols-2 gap-4"
        >
            <Input
                label="Горячая за м3"
                labelPlacement="outside"
                name="hot"
                radius="sm"
                isRequired
                className="col-span-2"
            />
            <Input
                label="Холодная за м3"
                labelPlacement="outside"
                name="cold"
                radius="sm"
                isRequired
                className="col-span-2"
            />
            <Input
                label="Канализация за м3"
                labelPlacement="outside"
                name="sewer"
                radius="sm"
                isRequired
                className="col-span-2"
            />
            <I18nProvider locale="ru-RU">
                <DatePicker
                    isRequired
                    className="col-span-2"
                    label="Дата"
                    name="date"
                    firstDayOfWeek="mon"
                />
            </I18nProvider>
            <Button type="submit" className="col-span-2">Сохранить</Button>
        </Form>
    )
}
