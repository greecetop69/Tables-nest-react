import { DynamicTablesService } from './dynamic-tables.service';
export declare class DynamicTablesController {
    private readonly dynamicTablesService;
    constructor(dynamicTablesService: DynamicTablesService);
    createTable({ table_name, columns, ownerId, }: {
        table_name: string;
        ownerId: string;
        columns: {
            name: string;
            type: string;
        }[];
    }): Promise<string>;
    dropTable(tableName: string): Promise<string>;
    getAllTables(): Promise<any[]>;
    getTablesByOwnerId(ownerId: string): Promise<any[]>;
    getTableRows(tableName: string): Promise<any>;
    insertRow(tableName: string, { entry, }: {
        entry: any;
    }): Promise<string | void>;
}
