export interface ArchiveFile {
    uuid: string;
    stored_date: string;
    status: string;
    size: number;
    resource_uri: string;
    replicated_package: unknown;
    replicas: string[];
    related_packages: string[];
    package_type: string;
    origin_pipeline: string;
    misc_attributes: object;
    encrypted: boolean;
    current_path: string;
    current_location: string;
    current_full_path: string;
}
