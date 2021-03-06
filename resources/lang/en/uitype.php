<?php

return [
    'uitype' => [
        'text' => 'Text input',
        'textarea' => 'Text area',
        'hidden' => 'Hidden field',
        'time' => 'Hour',
        'date' => 'Date',
        'datetime' => 'Date and Hour',
        'integer' => 'Integer',
        'number' => 'Number',
        'range' => 'Range',
        'entity' => 'Entity',
        'color' => 'Coulor',
        'phone' => 'Phone',
        'email' => 'Email',
        'choice' => 'Multiple select',
        'select' => 'Select',
        'url' => 'URL',
        'boolean' => 'Boolean',
        'checkbox' => 'Checkbox',
        'password' => 'Password',
        'month' => 'Month',
        'week' => 'Week',
        'file' => 'File',
        'image' => 'Image',
        'assigned_user' => 'Assigned to',
        'module_list' => 'Modules list',
    ],
    'option' => [
        'common' => [
            'repeated' => 'Confirm',
        ],
        'choice' => [
            'choices' => 'Options',
            'multiple' => 'Multiple',
        ],
        'entity' => [
            'module' => 'Module',
            'field' => 'Field to display',
            'record_label' => '(Default)',
            'id' => 'ID',
            'relatedlist' => 'Create a related list',
        ],
        'file' => [
            'path' => 'Specific path',
            'public' => 'Public',
        ],
        'image' => [
            'path' => 'Specific path',
        ],
        'number' => [
            'min' => 'Min value',
            'max' => 'Max value',
            'step' => 'Gap between two values',
        ],
        'module_list' => [
            'admin' => 'Display admin modules',
            'for_crud' => 'Only modules link to a data model',
        ],
        'range' => [
            'min' => 'Min value',
            'max' => 'Max value',
            'step' => 'Gap between two values',
        ],
        'select' => [
            'choices' => 'Options',
        ],
        'percent' => [
            'precision' => 'Precision (number of decimals)',
        ],
        'currency' => [
            'precision' => 'Precision (number of decimals)',
            'symbol' => 'Currency symbol',
            'symbol_position' => 'Symbol position',
            'symbol_position_left' => '$1.00',
            'symbol_position_right' => '1.00$',
        ],
        'auto_number' => [
            'start_value' => 'Start value',
            'increment' => 'Increment',
            'prefix' => 'Prefix',
            'suffix' => 'Suffix',
            'strlen_min' => 'Minimum length (allow to fill in with 0 at start)',
        ],
    ],
    'import_option' => [
        'entity' => [
            'field' => 'Field to compare',
            'id' => 'ID',
        ],
        'date' => [
            'format' => 'Format in the file',
        ],
        'datetime' => [
            'format' => 'Format in the file',
        ],
        'time' => [
            'format' => 'Format in the file',
        ],
        'week' => [
            'format' => 'Format in the file',
        ],
        'month' => [
            'format' => 'Format in the file',
        ],
    ],
];
