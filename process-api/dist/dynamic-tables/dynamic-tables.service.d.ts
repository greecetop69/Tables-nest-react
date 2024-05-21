export declare class DynamicTablesService {
    createTable(table_name: string, columns: {
        name: string;
        type: string;
    }[], ownerId: string): Promise<string>;
    dropTable(tableName: string): Promise<string>;
    getAllTables(): Promise<any[]>;
    getTablesByOwnerId(ownerId: string): Promise<any[]>;
    getTable(tableName: string): Promise<any>;
    insertRow(tableName: string, row: any): Promise<string>;
}
