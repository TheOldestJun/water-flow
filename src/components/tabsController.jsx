import { Tabs, Tab, Card, CardBody } from '@heroui/react';
import BackupTab from './backupTab';
import DataInputTab from './dataInputTab';
import DataTableTab from './dataTableTab';
import PaymentsTab from './paymentsTab';
import TariffsInputTab from './tariffsInputTab';

export default function TabsController() {
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <Tabs aria-label="Options" variant="underlined">
                <Tab key="dataTable" title="Таблица">
                    <Card>
                        <CardBody>
                            <DataTableTab />
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="dataInput" title="Ввод данных">
                    <Card>
                        <CardBody>
                            <DataInputTab />
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="payments" title="Платежи">
                    <Card>
                        <CardBody>
                            <PaymentsTab />
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="tariffsInput" title="Ввод тарифов">
                    <Card>
                        <CardBody>
                            <TariffsInputTab />
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="backup" title="Резервное копирование/восстановление">
                    <Card>
                        <CardBody>
                            <BackupTab />
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    )
}